import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export const InvalidUrl = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
        <CssBaseline />
        <Container fixed>
            {/* <Typography  > */}
                <Card className={classes.root} style={{ backgroundColor: '#cfe8fc', height: '70vh' }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        ooooops...!! it's a 404
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        Wrong Url, check that you have the correct Url ...!!
                        </Typography>
                    </CardContent>
                </Card>
            {/* </Typography> */}
        </Container>
    </React.Fragment>
        );
    };
export default InvalidUrl;
