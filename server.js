require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const path = require("path");

const pdfTemplate = require("./documents");

const app = express();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const URI = process.env.MONGO_URI;

const googleclient = new OAuth2Client(GOOGLE_CLIENT_ID);
const mongoclient = new MongoClient(URI);

let DB;
try {
  // Connect to the MongoDB cluster
  mongoclient.connect();
  console.log("Connected to MongoDB !");
  DB = mongoclient.db("resumebuilder");
} catch (e) {
  console.error(e);
}

const options = {
  height: "42cm",
  width: "35.7cm",
  timeout: "6000",
  childProcessOptions: {
    env: {
      OPENSSL_CONF: '/dev/null',
    },
  }
};

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await googleclient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again", e: error };
  }
};

app.post("/verifyToken", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.GOOGLE_CLIENT_SECRET, (err, decodedToken) => {
    if (
      err &&
      (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
    ) {
      res.status(401).json({
        message: err,
      });
    }

    const email = decodedToken?.email;

    DB.collection("users")
      .findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: "You are not registered. Please sign up",
          });
        } else {
          if (Date.now() < decodedToken.exp * 1000) {
            return res.status(200).json({ status: "Success" });
          }
        }
      });
  });
});

app.post("/signup", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const user = {
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
        token: jwt.sign(
          { email: profile?.email },
          process.env.GOOGLE_CLIENT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      };

      DB.collection("users")
        .insertOne(user)
        .then((resp) => {
          res.status(201).json({
            message: "Signup was successful",
            user: user,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed. " + error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      DB.collection("users")
        .findOne({ email: profile?.email })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              message: "You are not registered. Please sign up",
            });
          }
          DB.collection("resume")
            .findOne({ userid: user?._id.toString() })
            .then((resumeDoc) => {
              res.status(201).json({
                message: "Login was successful",
                resume: resumeDoc,
                user: {
                  firstName: profile?.given_name,
                  lastName: profile?.family_name,
                  picture: profile?.picture,
                  email: profile?.email,
                  token: jwt.sign(
                    { email: profile?.email },
                    process.env.GOOGLE_CLIENT_SECRET,
                    {
                      expiresIn: "1d",
                    }
                  ),
                },
              });
            });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err?.message || err,
    });
  }
});

app.post("/save", (req, res) => {
  const { user, resume } = req.body;
  delete resume.step;

  DB.collection("users")
    .findOne({ email: user.email })
    .then((userDoc) => {
      const USERID = userDoc._id.toString();
      const data = {
        userid: USERID,
        ...resume,
      };
      DB.collection("resume")
        .findOne({ userid: USERID })
        .then((resumeDoc) => {
          if (resumeDoc) {
            DB.collection("resume")
              .deleteOne({ userid: USERID })
              .then(() => {
                DB.collection("resume")
                  .insertOne(data)
                  .then(() => res.sendStatus(200))
                  .catch((err) => res.send(err));
              })
              .catch((err) => console.log(err));
          } else {
            DB.collection("resume")
              .insertOne(data)
              .then(() => res.sendStatus(200))
              .catch((err) => res.send(err));
          }
        });
    });
});

app.post("/get-resume", (req, res) => {
  const { email } = req.body;
  DB.collection("users")
    .findOne({ email: email })
    .then((userDoc) => {
      const USERID = userDoc._id.toString();
      DB.collection("resume")
        .findOne({ userid: USERID })
        .then((resumeDoc) => {
          if (resumeDoc) {
            delete resumeDoc._id;
            delete resumeDoc.userid;
            res.send(resumeDoc);
          }
        });
    });
});

// POST route for PDF generation....
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
    if (err) {
      console.log(err);
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});

app.get("/", (req, res) => {
  res.send("Hello from 'Resume Builder' Web App");
});

// GET route -> send generated PDF to client...
app.get("/fetch-pdf", (req, res) => {
  const file = `${__dirname}/Resume.pdf`;
  res.download(file);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
