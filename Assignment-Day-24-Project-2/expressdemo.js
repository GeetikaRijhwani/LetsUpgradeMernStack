const express = require('express'); //Express Module
const app = express();  //Converting Express module into app object to be used with different requests handling
const bodyParser = require('body-parser'); //Middleware
const fs = require('fs');
const fsp = require('fs').promises;

app.use(bodyParser.json()); //Use bodyPrser middleware to extract data from each and every request (POST, PATCH & PUT)

//reading file

const moviesJSON = fs.readFileSync("./movies.json", { encoding: "utf-8" })
let movies = JSON.parse(moviesJSON);

// function for updating/writing file 

function updateFile(array, message, res) {
    fs.writeFile("./movies.json", JSON.stringify(array), (err) => {
        if (err != null) {
            res.send({ message: "There is some problem" });
        }
        res.send({ message:message});
    })
}

async function updateFileTwo(array) {
    let check;
    await fsp.writeFile("./movies.json", JSON.stringify(array))
        .then(() => {
            check = true;
        })
        .catch((err) => {
            console.log(err);
            check = false;
        })
        return check;
}

app.get('/movies', (req, res) => {    //Handling GET Request
    res.send(movies);
})

app.get('/movies/:id', (req, res) => {    //Handling GET Request with parameters
    console.log(req.params.id);
    let movie = movies.find((ele) => {
        return ele.id == req.params.id;
    })

    if (movie == undefined) {
        res.send({message: "movie not found"})
    }
    
    res.send(movie);
})


app.post('/movies', async (req, res) => {   //Post method using express
    
    movie = req.body; //data recieved from middleware is stored in body object
    movies.push(movie);

    // updateFile(movies, "Movie Created", res);

    let status = await updateFileTwo(movies);
    if (status == true)
    {
        res.send({ message: "Movie Created" });
    }
    else
    {
        res.send({ message: "There is some problem" });
    }
    
})

app.put('/movies/:id', async (req, res) => {
    id = req.params.id;
    let movie = req.body;
    movies.forEach((ele) => {
        if (ele.id == id)
        {
            ele.name = movie.name;
            ele.revenue = movie.revenue;
        }
        
    })

    let status = await updateFileTwo(movies);
    if (status == true)
    {
        res.send({ message: "Movie Updated" });
    }
    else
    {
        res.send({ message: "There is some problem" });
    }
})



app.delete('/movies/:id', async (req, res) => {   //Delete Method using Express
    id = req.params.id;
    movies.forEach((ele, index) => {
        if (ele.id == id) {
            movies.splice(index, 1);
        }
    })

    // updateFile(movies, "Movie Deleted", res);
    let status = await updateFileTwo(movies);
    console.log(status);
    if (status == true)
    {
        res.send({ message: "Movie Deleted" });
    }
    else
    {
        res.send({ message: "There is some problem" });
    }
})



app.listen(3000, () => {            //Starting Server using express
    console.log("Server is running");
});