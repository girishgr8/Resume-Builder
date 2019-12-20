import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const classes = useStyles ();
const useStyles = makeStyles (theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing (2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
