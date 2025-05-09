import express from 'express';

const app = express();
const port = 3001;

//we want to add data in the array
app.use(express.json())
// so we will acccept the datas which are in json format 
// when you take the data use post you can use get as well
let teaData=[]
let newId=1
app.post('/teas',(req,res)=>{
    const{name,price}=req.body;
    const newTea={id:newId++,name,price}
    teaData.push(newTea);
    res.status(201).send(newTea)
})
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})

//get a tea with a particular id
app.get('/tea/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
   return res.status(200).send(tea);
})
//updating the tea
app.put('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    const{name,price}=req.body
    tea.name=name
    tea.price=price
   return res.status(200).send(tea)
})

//deletion of tea 
app.delete('/teas/:id',(req,res)=>{
    const index=teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
      return  res.status(404).send('tea is not found')
    }
    teaData.splice(index,1)
    return res.status(200).send('delted')
})

app.listen(port, () => {
  console.log(`port is listening at :${port}...`);
});

