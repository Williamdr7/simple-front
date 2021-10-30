import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { actions as userActions } from "../../reducers/user.actions";
import { actions as homeActions } from "../../reducers/home.actions";
import { Box, Grid } from "@material-ui/core";
import { ControlledTextField, ZipCodeTextField } from "../../components/inputs";
import { UserPageStyles } from "./styles";
import axios from "axios";
import ContentBox from "../../components/ContentBox/ContentBox";
import DefaultButton from "../../components/Utils/DefaultButton/DefaultButton";
import DefaultLoader from "../../components/Utils/DefaultLoader";

const UserPage = () => {
  const classes = UserPageStyles();
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };
  const handleSubmit = (values) => {
    dispatch(
      userActions.saveUser.request({
        person: { ...values, idade: parseInt(formProps.getValues().idade) },
      })
    );
    dispatch(homeActions.loadUsers.request());
  };

  if (loading) {
    return <DefaultLoader />;
  }

  const cepSearch = async (cep) => {
    await axios.get(`https://viacep.com.br/ws/${cep}/json`).then((data) => {
      formProps.setValue("city", data.data.localidade);
      formProps.setValue("uf", data.data.uf);
    });
  };

  const onChangeCep = (value) => {
    formProps.setValue("cep", value);
    if (value.length === 9) {
      cepSearch(value.replace(/[^\d]+/g, ""));
    }
  };

  return (
    <ContentBox>
      <h2>Usuário #{id}</h2>

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
        <Box className={classes.saveButton}>
          <DefaultButton label="GRAVAR" type={"submit"} />
        </Box>
      </form>
    </ContentBox>
  );
};

export default UserPage;
