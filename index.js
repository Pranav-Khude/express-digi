import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

let teaData=[]
let nextId=1


app.post('/teas', (req, res) => {
    const {name,price}=req.body;
    const newTea={id:nextId,name,price};
    nextId++;
    teaData.push(newTea);
    res.send(newTea);
    }
);

app.get('/teas', (req, res) => {
    res.send(teaData);
    }
);

app.get('/teas/:id', (req, res) => {
    const tea=teaData.find(t=>t.id===parseInt(req.params.id));
    if(tea){
        res.send(tea);
    }else{
        res.status(404).send('Tea not found');
    }
    }
);

// update tea
app.put('/teas/:id', (req, res) => {
    const tea=teaData.find(t=>t.id===parseInt(req.params.id));
    if(tea){
        tea.name=req.body.name;
        tea.price=req.body.price;
        res.send(tea);
    }else{
        res.status(404).send('Tea not found');
    }
    }
); 

// delete tea

app.delete('/teas/:id', (req, res) => {
    const index=teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index>=0){
        teaData.splice(index,1);
        res.send('Tea deleted');
    }else{
        res.status(404).send('Tea not found');
    }
    }
);



const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}........`);
    }
);

