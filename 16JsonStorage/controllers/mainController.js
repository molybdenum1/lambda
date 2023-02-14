const fs = require("fs");

class MainController {
  async getData(req, res) {
    try {
      let route = req.params.id
      let data = fs.readFileSync(`data/${route}.txt`, 'utf8')
      // console.log(route);
      return res.send(JSON.parse(data));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async setData(req, res) {
    try {
      let json = req.body.data;
      let route = req.params.id;
      // console.log(req.body.data);
      await fs.writeFile(`data/${route}.txt`, JSON.stringify(json) + "\n", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
      return res.json({message: 'DATA SAVED'})
        
    } catch (error) {  
      res.status(400).json({message: error.message})
    }
  }
}

module.exports = new MainController();
