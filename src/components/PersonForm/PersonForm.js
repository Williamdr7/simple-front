import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { actions as userActions } from "../../reducers/user.actions";
import { actions as homeActions } from "../../reducers/home.actions";
import { Box, Grid } from "@material-ui/core";
import { ControlledTextField, ZipCodeTextField } from "../../components/inputs";
import DefaultButton from "../../components/Utils/DefaultButton/DefaultButton";
import { PersonFormStyles } from "./styles";

const PersonForm = ({ backToList }) => {
  const classes = PersonFormStyles();
  const dispatch = useDispatch();
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    city: "",
    uf: "",
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };
  const cepSearch = async (cep) => {
    await axios.get(`https://viacep.com.br/ws/${cep}/json`).then((data) => {
      formProps.setValue("city", data.data.localidade);
      formProps.setValue("uf", data.data.uf);
    });
  };
  const handleSubmit = (values) => {
    dispatch(
      userActions.createUser.request({
        ...values,
        idade: parseInt(formProps.getValues().idade),
      })
    );
    dispatch(homeActions.loadUsers.request());
    backToList();
  };

  const onChangeCep = (value) => {
    formProps.setValue("cep", value);
    if (value.length === 9) {
      cepSearch(value.replace(/[^\d]+/g, ""));
    }
  };

  return (
    <>
      <form onSubmit={formProps.handleSubmit(handleSubmit)}>
        <Grid spacing={2} container>
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
              className={classes.userInput}
              variant="outlined"
              label="Nome"
              name={"nome"}
              formProps={formProps}
            />
          </Grid>
          <Grid xs="12" lg="6" item>
            <ControlledTextField
              label="Cidade"
              className={classes.userInput}
              name={"city"}
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
          <Grid xs="12" lg="6" item>
            <ControlledTextField
              variant="outlined"
              className={classes.userInput}
              label="Idade"
              name={"idade"}
              formProps={formProps}
            />
          </Grid>
        </Grid>
        <Box marginTop="32px" display="flex" justifyContent="space-between">
          <DefaultButton
            style={{ backgroundColor: "rgb(255, 86, 48)" }}
            className=""
            label="Cancelar"
            onClick={backToList}
          />
          <DefaultButton label="Adicionar" type={"submit"} />
        </Box>
      </form>
    </>
  );
};

export default PersonForm;
