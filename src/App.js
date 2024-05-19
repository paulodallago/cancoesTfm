import "./App.css";
import { TabView, TabPanel } from "primereact/tabview";
import { PrimeReactProvider } from "primereact/api";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primereact/resources/themes/soho-dark/theme.css";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

//TODO: Organizar o código
//TODO: Otimizar queries
//TODO: descobrir como por quebra de linha na letra
//TODO: estilizar
//TODO: testar no github pages
//TODO: adicionar categorias

//TODO: criar mecanismo de login
//TODO: vai ter uma aba pra ver as suas contribuições e editar
//TODO: usuário comum e admin

function App() {
  const [cancoes, setCancoes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const getCancoes = async () => {
    await getDocs(collection(db, "cancoes")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCancoes(newData);
    });
  };

  const getCategorias = async () => {
    await getDocs(collection(db, "categorias")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategorias(newData);
    });
  };

  useEffect(() => {
    getCancoes();
    getCategorias();
  }, []);

  const [dlgVisible, setDlgVisible] = useState(false);

  const [newTitulo, setNewTitulo] = useState("");
  const [newLetra, setNewLetra] = useState("");
  const [newCategoria, setNewCategoria] = useState("");
  const [newContribuidor, setNewContribuidor] = useState("");

  const saveCancao = async (cancao) => {
    console.log(cancao);
    try {
      const docRef = await addDoc(collection(db, "cancoes"), {
        titulo: cancao.newTitulo,
        letra: cancao.newLetra,
        categoria: cancao.newCategoria,
        contribuidor: cancao.newContribuidor,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="App">
      <div className="Header">
        Canções TFM
        <Button onClick={() => setDlgVisible(true)}>+</Button>
        <Dialog
          header="Adicionar canção"
          visible={dlgVisible}
          onHide={() => setDlgVisible(false)}
          className="dialogAddCancao"
        >
          <label htmlFor="titulo">Título</label>
          <InputText
            id="titulo"
            value={newTitulo}
            onChange={(e) => {
              setNewTitulo(e.target.value);
            }}
          ></InputText>

          <label htmlFor="Letra">Letra</label>
          <InputTextarea
            id="letra"
            value={newLetra}
            onChange={(e) => {
              setNewLetra(e.target.value);
            }}
          ></InputTextarea>

          <Dropdown
            value={newCategoria}
            onChange={(e) => setNewCategoria(e.value.nome)}
            options={categorias}
            optionLabel="nome"
            placeholder="Selecione uma categoria"
          ></Dropdown>

          <label htmlFor="contribuidor">Contribuidor</label>
          <InputText
            id="contribuidor"
            value={newContribuidor}
            onChange={(e) => {
              setNewContribuidor(e.target.value);
            }}
            aria-describedby="contribuidor-help"
          ></InputText>
          <small id="contribuidor-help">Ex: SD Dal Lago</small>

          <Button
            onClick={() => {
              saveCancao({
                newTitulo,
                newLetra,
                newCategoria,
                newContribuidor,
              });
            }}
          >
            Salvar
          </Button>
        </Dialog>
      </div>
      <TabView>
        {categorias.map((categoria) => (
          <TabPanel header={categoria.nome} key={categoria.id}>
            <Accordion>
              {cancoes.map((cancao) => {
                if (cancao.categoria == categoria.nome) {
                  return (
                    <AccordionTab header={cancao.titulo} key={cancao.id}>
                      {cancao.letra}
                      <div className="boxContribuidor">
                        Contribuidor: {cancao.contribuidor}
                      </div>
                    </AccordionTab>
                  );
                }
              })}
            </Accordion>
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
}

export default App;
