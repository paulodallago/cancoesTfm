import "./App.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primereact/resources/themes/soho-dark/theme.css";
import { useState, useEffect } from "react";
import { getCancoes, getCategorias } from "./services";
import Header from "./components/Header";
import { ProgressSpinner } from "primereact/progressspinner";

//TODO: Organizar o código -> pode ser melhor
//TODO: Otimizar queries -> é possível, mas deixa as trocas de tab lentas
//TODO: descobrir como por quebra de linha na letra -> feito
//TODO: estilizar
//TODO: adicionar categorias -> feito
//TODO: icone de carregamento -> feito
//TODO: titulo e icone
//TODO: apagar obj quando fecha o dlg add -> feito
//TODO: mensagens de sucesso -> pode ser melhor
//TODO: validação -> feito
//TODO: easter egg
//TODO: organizar imports

//TODO: criar mecanismo de login
//TODO: vai ter uma aba pra ver as suas contribuições e editar
//TODO: usuário comum e admin

function App() {
  const [cancoes, setCancoes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cancoesData = await getCancoes();
      setCancoes(cancoesData);
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);

  const formatLineBreak = (cancao) => {
    return cancao.letra.split("\n").map((data, index) => (
      <span key={index}>
        {data}
        <br />
      </span>
    ));
  };

  return (
    <div className="App">
      <Header />
      {loading ? (
        <ProgressSpinner
          style={{ width: "20vw", height: "10vw" }}
          strokeWidth="6"
        />
      ) : (
        <div className="body">
          <TabView>
            {categorias.map((categoria) => (
              <TabPanel header={categoria.nome} key={categoria.id}>
                <Accordion>
                  {cancoes.map((cancao) => {
                    if (cancao.categoria == categoria.nome) {
                      return (
                        <AccordionTab header={cancao.titulo} key={cancao.id}>
                          <div className="boxLetra">
                            {formatLineBreak(cancao)}
                          </div>
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
      )}
    </div>
  );
}

export default App;
