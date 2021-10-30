import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import ContentBox from "../../components/ContentBox/ContentBox";
import { ControlledTextField, ZipCodeTextField } from "../../components/inputs";
import DefaultButton from "../../components/Utils/DefaultButton/DefaultButton";
import { AccountPageStyles } from "./styles";

export default function AccountPage() {
  const classes = AccountPageStyles();
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

  const onChangeCep = (value) => {
    formProps.setValue("cep", value);
  };
  return (
    <ContentBox>
      <h2>Meus Dados (Não Integrado)</h2>

      <Grid spacing={2} container>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            className={classes.userInput}
            variant="outlined"
            label="Nome"
            name={"nome"}
            type="password"
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Idade"
            name={"idade"}
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" lg="6" item>
          <ZipCodeTextField
            label="CEP"
            className={classes.userInput}
            value={formProps.watch("cep")}
            InputProps={{
              name: "cep",
              formProps: formProps,
            }}
            name={"cep"}
            variant="outlined"
            onChange={onChangeCep}
            formProps={formProps}
            customInput={ControlledTextField}
          />
        </Grid>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            label="Cidade"
            className={classes.userInput}
            name={"cidade"}
            variant="outlined"
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="UF"
            name={"uf"}
            formProps={formProps}
          />
        </Grid>
      </Grid>

      <Box className={classes.saveButton}>
        <DefaultButton label="GRAVAR" type={"submit"} />
      </Box>
      <Box mt={5}>
        <h2 mt="5" className="mt-5">
          Atualizar Senha (Não Integrado)
        </h2>
      </Box>
      <Grid spacing={2} container>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Senha atual"
            name={"current_password"}
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Nova Senha"
            name={"new_password"}
            formProps={formProps}
          />
        </Grid>
        <Grid xs="12" lg="6" item>
          <ControlledTextField
            variant="outlined"
            className={classes.userInput}
            label="Repita a Nova Senha"
            name={"repeat_new_password"}
            formProps={formProps}
          />
        </Grid>
      </Grid>
      <Box className={classes.saveButton}>
        <DefaultButton label="GRAVAR" type={"submit"} />
      </Box>
    </ContentBox>
  );
}
