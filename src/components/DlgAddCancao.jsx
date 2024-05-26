import "./styles/DlgAddCancao.css";
import { addDoc, collection } from "firebase/firestore";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { getCategorias } from "../services";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

const DlgAddCancao = (props) => {
  const toast = useRef(null);

  const [newCancao, setNewCancao] = useState({
    titulo: "",
    letra: "",
    categoria: "",
    contribuidor: "",
  });

  const [categorias, setCategorias] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);

  const saveCancao = async () => {
    for (const key in newCancao) {
      if (newCancao[key] == "") {
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: "Todos os campos são obrigatórios",
        });
        return;
      }
    }
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "cancoes"), {
        ...newCancao,
        categoria: newCancao.categoria.nome,
      });
      console.log("Documento salvo, ID: ", docRef.id);
      onHide();
    } catch (e) {
      console.error("Erro: ", e);
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Algo deu errado, não foi possível salvar",
      });
    }
    setLoading(false);
  };

  const onHide = () => {
    setNewCancao({
      titulo: "",
      letra: "",
      categoria: "",
      contribuidor: "",
    });
    props.onHide();
  };

  const handleInputChange = (e) => {
    const { value, id } = e.target;
    setNewCancao((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDropdownChange = (e) => {
    setNewCancao((prev) => ({
      ...prev,
      categoria: e.target.value,
    }));
  };

  return (
    <Dialog
      header="Adicionar canção"
      className="dialogAddCancao"
      visible={props.visible}
      onHide={onHide}
    >
      {loading ? (
        <ProgressSpinner
          style={{ width: "20vw", height: "10vw" }}
          strokeWidth="6"
        />
      ) : (
        <>
          <Toast ref={toast} />
          <label htmlFor="titulo">Título</label>
          <InputText
            id="titulo"
            value={newCancao.titulo}
            onChange={(e) => handleInputChange(e)}
          ></InputText>

          <label htmlFor="Letra">Letra</label>
          <InputTextarea
            id="letra"
            value={newCancao.letra}
            onChange={(e) => handleInputChange(e)}
            autoResize
          ></InputTextarea>

          <label htmlFor="categoria">Categoria</label>
          <Dropdown
            value={newCancao.categoria}
            onChange={(e) => handleDropdownChange(e)}
            options={categorias}
            optionLabel="nome"
            placeholder="Selecione uma categoria"
            id="categoria"
          ></Dropdown>

          <label htmlFor="contribuidor">Contribuidor</label>
          <InputText
            id="contribuidor"
            value={newCancao.contribuidor}
            onChange={(e) => handleInputChange(e)}
            aria-describedby="contribuidor-help"
          ></InputText>
          <small id="contribuidor-help">Ex: SD Dal Lago</small>

          <Button
            onClick={() => {
              saveCancao(newCancao);
            }}
          >
            Salvar
          </Button>
        </>
      )}
    </Dialog>
  );
};

export default DlgAddCancao;
