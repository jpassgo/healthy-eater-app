import { ChangeEvent, useState } from "react"
import Grid from '@material-ui/core/Grid';
import React from "react";
import { Styles, StyledComponentProps } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
    gridContainer: {
          
    },
}));

interface LoginPageState {
    username: string;
    password: string;
}

const LoginPage = (props: LoginPageProps): JSX.Element => {

    const [state, setState] = useState<LoginPageState>({
        username: '',
        password: '',
    });

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const handleLoginClick = (event: React.MouseEvent<HTMLElement>): void => {
        if (event) {
            event.preventDefault();
        }

        props.handleLoginClick(state.username, state.password);
    };

    return (
        <Grid container 
            direction={'column'}
            alignItems={'center'}
            justify={'center'}  
            >
            <form>
                <Grid item>

                </Grid>
            </form>

        </Grid>

    );

    interface LoginPageProps {
        handleLoginClick: (username: string, password: string) => void;
    }
}