import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledTextField } from "../../components/inputs";
import DefaultButton from "../../components/Utils/DefaultButton/DefaultButton";
import { SigninStyles } from "./styles";
import { toast } from "react-toastify";
import { login } from "../../services/user.service";
import AuthService from "../../services/auth.service";

export default function Signin() {
  const classes = SigninStyles();
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    password: "",
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };

  const handleSubmit = async () => {
    const formValues = formProps.getValues();

    try {
      const { data } = await login({
        email: formValues.email,
        password: formValues.password,
      });
      AuthService.setToken(data.token);
      AuthService.setApiDefaults();
      AuthService.setItem("user", JSON.stringify(data.user));
      window.location.pathname = "/";
    } catch (err) {
      toast.error("Usuário ou(e) Senha Incorreto(s)");
      console.error(err);
    }
  };
  return (
    <form onSubmit={formProps.handleSubmit(handleSubmit)}>
      <Grid spacing={2} container>
        <Grid xs="12" item>
          <ControlledTextField
            className={classes.userInput}
            variant="outlined"
            label="Email"
            name={"email"}
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Senha"
            name="password"
            type="password"
            formProps={formProps}
          />
        </Grid>
      </Grid>
      <Box className={classes.saveButton}>
        <DefaultButton label="Entrar" type={"submit"} />
      </Box>
    </form>
  );
}
