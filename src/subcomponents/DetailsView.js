// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

// Librerías y otros:
import { useHistory, useParams } from "react-router-dom";
import logo from "../assets/images/superhero-64.png";


function DetailsView({ heroes, getMainViewHandler }) {
  // Para usar hook 'useHistory' de react-router:
  let history = useHistory();
  let { member } = useParams();

  return (
    <Container fluid>
      <Row>
        {/* Color de fondo según el alineamiento del heroe: */}
        <Col sm={12} md={{span: 10, offset: 1}} xl={{span: 8, offset: 2}}
             className={heroes[member].biography.alignment + "Hero heroDetails"}>
          <Row>
            <Col xs={12}>
              {/* Logo y Título */}
              <div className="text-center">
                <Image src={logo}
                      id="imageLogo"
                      alt="Logo" />

                <h1 id="heroDetailsTitle">[Detalles del Héroe]</h1>
                <br /><br />
              </div>

              {/* Nombre */}
              <h1>Nombre: <span className="heroName">{heroes[member].name}</span></h1>
            </Col>

            <Col xs={12} md={6}>            
              {/* Imagen */}
              <img src={heroes[member].image.url} className="heroDetailsImage" alt=""></img>
              <br></br>
              {/* Powerstats */}
              <p className="heroDescription">Powerstats de {heroes[member].name}:</p>            
              <h5>{showHeroPowerstats(heroes[member])}</h5>
            </Col>

            {/* Detalles del Héroe/Villano */}
            <Col xs={12} md={6}>
              <h1 className="heroDescription">Detalles de {heroes[member].name}:</h1>
              <ul className="powerStats">
                <li>
                  <h5><Badge pill bg="dark">Alias</Badge></h5>
                  <ul>{showHeroAliases(heroes[member])}</ul>
                </li>
                <br />                
                <li>
                  <h5>
                    <Badge pill bg="dark">Altura<span> </span>
                    <Badge pill bg="secondary">{heroes[member].appearance.height[1]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <li>
                  <h5>
                    <Badge pill bg="dark">Peso<span> </span>
                    <Badge pill bg="secondary">{heroes[member].appearance.weight[1]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <li>
                  <h5>
                    <Badge pill bg="dark">Color de ojos<span> </span>
                    <Badge pill bg="secondary">{heroes[member].appearance["eye-color"]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <li>
                  <h5>
                    <Badge pill bg="dark">Color de cabello<span> </span>
                    <Badge pill bg="secondary">{heroes[member].appearance["hair-color"]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <br />

                <li>
                  <h5><Badge pill bg="dark">Lugares de trabajo</Badge></h5>
                  <ul>{showWorkBases(heroes[member])}</ul>
                </li>
              </ul>
            </Col>

            {/* Boton Volver */}
            <Col xs={12} className="text-center">
              <br /><br />
              <Button variant="outline-dark"
                          type="input"
                          size="lg"
                          onClick={ () => getMainViewHandler(history)}
              >Volver a principal</Button>
            </Col>            
          </Row>
          
        </Col>
      </Row>
    </Container>
  );
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con clave y valor (en negrita) por cada powerstat:
function showHeroPowerstats(hero) {
  return Object.entries(hero.powerstats)
               .map( ([power, value], index) => (
                    <span key={index}>
                      <Badge pill bg="dark">{power}<span> </span>
                        <Badge pill bg="secondary">{value === "null" ? "---" : value}</Badge> {/* Algunos valores pueden llegar 'null'. */}
                      </Badge>
                      <span> </span>
                    </span>
               ));
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con los todos alias listados (si existen):
function showHeroAliases(hero) {
  return hero.biography.aliases.map( (alias, index) =>
    <li key={index}>
      {/* Algunos alias pueden llegar con varios adentro, separados por coma o punto y coma.*/}
      {alias.split(/,|;/).map( (base, index) => 
        <h5 key={index}><Badge pill bg="secondary">{base}</Badge></h5>
      )}
    </li>);
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con los todos lugares de trabajo del héroe listados (si existen):
function showWorkBases(hero) {
  return hero.work.base.split(/,|;/)
                       .map( (base, index) =>
                       <h5 key={index}><Badge pill bg="secondary">{base}</Badge></h5>
                       );
}

export default DetailsView;
