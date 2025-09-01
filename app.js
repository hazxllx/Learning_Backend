const express = require('express');
const app = express();

app.use(express.json());

const delay = () => new Promise(resolve => setTimeout(resolve, 100));

// Create, Post/items + json body -> new resource
app.post('/items', async(req,res) => {
    try{
        await  delay(); //Db operation

        //Bagong item with auto-generated ID
        const newItem ={
            id: items.length + 1, //ID generation
            name: req.body.name, //Get name from req 
            price: req.body.price //Get price from req
        };

        items.push(newItem);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({error: 'Server Error'}); //Sira server
    }
});

//Fetch all from Db, Get/items -> return array of all items
app.get('/items', async(req,res) => {
    try{
        await delay();

        //Searching with the matched id. req.params.id is from url
        const item = items.find(i => i.id == req.params.id);

        //Kapag di ma see, return 404
        if(!item) return res.status(404).json({error: 'Not Found'});

        res.status(200).json(item); // 200 is kapag nahanap nya

    } catch(error){
        res.status(500).json({error: 'Server error'});
    }
});

//Update, Put or Patch(?)/items/1 + json body 
app.put('/items/:id', async (req, res) => {
    try{
        await delay();

        const index = items.findIndex(i => i.id == req.params.id);
        
        if(index == -1) return res.status(404).json({error: 'Not found'});

        //Replace old item w/ new data but id is not change
        items[index] = {
            id:parseInt(req.params.id),
            ...req.body
        };
        res.status(200).json(items[index]);
    } catch(error){
        res.status(500).json({error: 'Server error'});
    }
});

//Delete, delete/items/1 -> removes with Id 1
app.delete('/items/:id', async (req,res) => {
    try{
        await delay();

        const index = items.findIndex(i => i.id == req.params.id);

        if(index === -1 ) return res.status(404).json({error: 'Not found'});
    
        items.splice(index, 1);
        res.status(204).send();
    } catch (error){
        res.status(500).json({error: 'Service error'});
    }
});

//Start server
app.listen(3000, () => console.log('Server running port 3000'));