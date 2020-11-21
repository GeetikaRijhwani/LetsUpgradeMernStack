let superheroes = [
    {
        id: 1,
        name: "Thor",
        age: 1500,
        planet: "Asgard",
        weapons: ['Mjolnir', 'Thunderstrike', 'Stormbreaker']
    },
    {
        id: 2,
        name: "Ironman",
        age: 34,
        planet: "Earth",
        weapons: ['Pulse Barrage', 'Tri-beam', 'Pentabeam']
    },
    {
        id: 3,
        name: "Captain America",
        age: 101,
        planet: "Earth",
        weapons: ['Energy Shield', 'Utility Belt']
    },
];

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const path = url.parse(req.url, true);
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":"*",
        "Content-Type": "application/json"
    });

    if (path.pathname == "/" || path.pathname == "/superheros") {
        superheroesString = JSON.stringify(superheroes);
        res.end(superheroesString);
    }

    else if (path.pathname == "/superhero") {

        if (req.method == "OPTIONS") {
            res.end();
        }
        else if (req.method == "GET") {
            const id = path.query.id;
            const singleHero = superheroes.find((ele) => {
                return ele.id == id;
            });
        
            res.end(JSON.stringify(singleHero));
        }
        else if (req.method == "POST") {
            let body = "";
            req.on('data', (data) => {
                body += data;
            });

            req.on('end', () => {
                let superhero = JSON.parse(body);
                superheroes.push(superhero);
                console.log(superheroes);
                res.end(JSON.stringify(superheroes));
                
            });
        }
        else if (req.method == "PUT") {
            //Superhero id
            const id = path.query.id;

            //Superhero Data
            let body = "";
            req.on('data', (data) => {
                body += data;
            });

            req.on('end', () => {
                let superhero = JSON.parse(body);

                superheroes.forEach((ele) => {
                    if (ele.id == id) {
                        ele.name = superhero.name;
                        ele.age = superhero.age;
                        ele.planet = superhero.planet;
                        ele.weapons = superhero.weapons;
                    }
                });

                    res.end(JSON.stringify(superheroes));
            });
        }
        else if (req.method == "DELETE") {
            //Superhero id
            const id = path.query.id;

            superheroes.forEach((ele,index) => {
                if (ele.id == id) {
                    superheroes.splice(index, 1);
                }
            });
                res.end(JSON.stringify(superheroes));
        }

    }
    else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({message: "Not Found anything for this URL"}));
    }



});

server.listen("3000", "127.0.0.1", () => {
    console.log("server is running");
})
