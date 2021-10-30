import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../../reducers/routes.actions";
import { actions as homeActions } from "../../reducers/home.actions";
import { Edit, DeleteOutline } from "@material-ui/icons";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";
import { HomePageStyles } from "./styles";
import ContentBox from "../../components/ContentBox/ContentBox";
import DefaultLoader from "../../components/Utils/DefaultLoader";
import DefaultButton from "../../components/Utils/DefaultButton/DefaultButton";
import { useState } from "react";
import PersonForm from "../../components/PersonForm/PersonForm";

const HomePage = () => {
  const classes = HomePageStyles();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("list");
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <DefaultLoader />;
  }

  const handleDelete = (id) => {
    dispatch(homeActions.deleteUser.request(id));
    dispatch(homeActions.loadUsers.request());
  };

  return (
    <ContentBox>
      <Box display="flex" container>
        <h2>Usuários</h2>
        {tab !== "create" && (
          <Box className={classes.addButton}>
            <DefaultButton label="Adicionar" onClick={() => setTab("create")} />
          </Box>
        )}
      </Box>

      {tab === "create" ? (
        <PersonForm backToList={() => setTab("list")} />
      ) : (
        <Box className={classes.tableContainer}>
          {data && data.length ? (
            <Table
              className={classes.table}
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow className={classes.headerText}>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Idade</TableCell>
                  <TableCell align="right">Cidade/UF</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .sort((a, b) => b.idade - a.idade)
                  .map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.nome}
                      </TableCell>
                      <TableCell align="right">{user.idade}</TableCell>
                      <TableCell align="right">
                        {user.city}/{user.uf}
                      </TableCell>
                      <TableCell style={{ cursor: "pointer" }} align="right">
                        <Edit
                          className={classes.editIcon}
                          onClick={() =>
                            dispatch(
                              routeActions.redirectTo(routes.USER, {
                                id: user.id,
                              })
                            )
                          }
                        />
                        <DeleteOutline
                          onClick={() => handleDelete(user.id)}
                          className={classes.deleteIcon}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <Box margin="0">
              <h3 style={{ color: "#555" }}>
                Nenhum Usuário Cadastrado, clique em "Adicionar" para cadastrar
                novos usuários...
              </h3>
            </Box>
          )}
        </Box>
      )}
    </ContentBox>
  );
};

export default HomePage;
