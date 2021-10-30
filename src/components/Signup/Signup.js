import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledTextField } from "../../components/inputs";
import DefaultButton from "../../components/Utils/DefaultButton/DefaultButton";
import { SignupStyles } from "./styles";
import { toast } from "react-toastify";
import { register } from "../../services/user.service";
import AuthService from "../../services/auth.service";

export default function Signup() {
  const classes = SignupStyles();
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

  const validate = () => {
    const formValues = formProps.getValues();
    const errors = [];
    if (formValues.password !== formValues.repeat_password) {
      errors.push("Senhas incompatíveis");
    }
    if (!formValues.password || !formValues.email) {
      errors.push("Preencha corretamente os campos");
    }

    if (errors.length) {
      errors.map((msg) => toast.error(msg));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const formValues = formProps.getValues();

    if (!!validate()) {
      try {
        const { data } = await register({
          email: formValues.email,
          password: formValues.password,
        });
        AuthService.setToken(data.token);
        AuthService.setApiDefaults();
        AuthService.setItem("user", JSON.stringify(data.user));
        toast.success("Email cadastrado com sucesso!");
        window.location.pathname = "/";
      } catch (err) {
        toast.error("E-mail já cadastrado");
        console.error(err);
      }
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
            type="email"
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Senha"
            name={"password"}
            type="password"
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Repita sua Senha"
            name={"repeat_password"}
            type="password"
            formProps={formProps}
          />
        </Grid>
      </Grid>
      <Box className={classes.saveButton}>
        <DefaultButton label="Cadastrar" type={"submit"} />
      </Box>
    </form>
  );
}
