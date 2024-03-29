// React-Bootstrap:
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from "react-bootstrap/Badge";


function AccumulativeStats({ heroes }) {
  return (
    <Col xs={12}>
      <Row className="accumulativeDiv emptyHero">
        <Col xs={12}>
          {/* Powerstats */}
          <span className="powerStatsTitle">Powerstats del equipo:</span>
          <h4>{showAccumulativePowerstats(heroes)}</h4>
          {/* Promedios */}
          <span className="powerStatsTitle">Promedios:</span>
          <h4>{showWeightHeightAverage(heroes)}</h4>
        </Col>
      </Row>
    </Col>
  );
}

// Función que recibe héroes por parámetro y devuelve JSX con todos los powerstats acumulados
// de cada miembro del equipo:
function showAccumulativePowerstats(heroes) {
  // Creando objeto inicial de powerstats acumulativos:
  const factionPowerstats = {
    "intelligence": 0,
    "speed": 0,
    "durability":	0,
    "power": 0,
    "combat": 0,
    "strength": 0
  };

  // Sumando cada powerstats en héroes de la misma facción recibida por argumento:
  heroes.forEach( (hero) => {
    if (hero) {
       // Primero acumulando powerstats:
      Object.entries(hero.powerstats)
            .map( ([trait, value]) =>
              // 'parseInt' toma a cont. los primeros números y descarta cualquier string
              // restante. Pero es necesario parsear a cero (0) si se recibe 'null'.
              factionPowerstats[trait] += (value === "null" ? 0 : parseInt(value)))
    }
  });
  
  // JSX:
  return (
    <p>
      {Object.entries(factionPowerstats)
            .sort( ([,a],[,b]) => b - a )      // Pasando función de ordenamiento a sort.
            .map( ([trait, value], index) =>   // Mapeando a elementos <li>, con rasgos y valores.
                <span key={index}>
                  {index === 0 &&
                    <> {/* 1° Powerstat (rasgo distintivo del equipo) */}
                      {value === 0 ?
                        /* Si el mayor powerstat es cero, no cambiar colores (dejarlo igual que al resto) */
                        <Badge pill bg="dark">{trait}<span> </span>
                          <Badge pill bg="secondary">{value}</Badge>
                        </Badge>
                        :
                        /* Si el mayor powerstat es mayor a cero, se cambian colores y se pone leyenda */
                        <Badge pill bg="primary">{trait}<span> </span>
                          <Badge pill bg="dark">{value}</Badge>
                          <span> </span>
                          <Badge pill bg="danger">¡Rasgo distintivo!</Badge>
                        </Badge>
                      }
                      <span> </span>
                    </>
                  }
                  {index > 0 && 
                    <>  {/* Powerstats restantes */}
                      <Badge pill bg="dark">{trait}<span> </span>
                        <Badge pill bg="secondary">{value}</Badge>
                      </Badge>
                      <span> </span>
                    </>
                  }
                </span>
            )
      }
    </p>
  );
}

// Función que recibe héroes por parámetro y devuelve JSX con todos los pesos y alturas
// acumulados de cada miembro del equipo:
function showWeightHeightAverage(heroes) {
  const heightsTotal = [];
  const weightsTotal = [];

  // Acumulando alturas y pesos:
  heroes.forEach( (hero) => {
    if (hero) {
      let height = hero.appearance.height[1];
      let weight = hero.appearance.weight[1];

      // Agregando valores obtenidos por API a sus respectivos arrays. No hace falta
      // quitar 'kg' o 'cm' de los strings recibidos porque 'parseInt' toma solamente los
      // primeros números (y descarta cualquier string restante).
      // Pero si es necesario parsear a cero (0) si algún string recibido es 'null'.
      heightsTotal.push(height === "null" ? 0 : parseInt(height)); 
      weightsTotal.push(weight === "null" ? 0 : parseInt(weight));
    }
  });
  
  // Sacando totales de c/u:
  const heightsAverage = heightsTotal.reduce( (total, current) => total + current, 0) / heightsTotal.length;
  const weightsAverage = weightsTotal.reduce( (total, current) => total + current, 0) / weightsTotal.length;

  // JSX:
  return (
    <p>
      <Badge pill bg="dark">Altura promedio<span> </span>
        <Badge pill bg="secondary">{heightsAverage ? heightsAverage.toFixed(0) : 0 } cm.</Badge>
      </Badge>

      <span> </span>
      <Badge pill bg="dark">Peso promedio<span> </span>
        <Badge pill bg="secondary">{weightsAverage ? weightsAverage.toFixed(0) : 0} kg.</Badge>
      </Badge>
    </p>
  );
}

export default AccumulativeStats;
