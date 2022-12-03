
const fs = require('fs')

function sortGruppirovkaHolidays () {
    let json = fs.readFileSync('./holidays.json', (err, data) => {
        if (err) throw err;
        return data;
    })
    json = JSON.parse(json);

    let newArr = json.map(obj => {
        return {
            name: obj.user.name,
            userId: obj.user._id,
            weekendDates: {
                startDate: obj.startDate,
                endDate: obj.endDate
            
            }
        }
    })
    
    var output = newArr.reduce(function(o, cur) {

        // Get the index of the key-value pair.
        var occurs = o.reduce(function(n, item, i) {
          return (item.name === cur.name) ? i : n;
        }, -1);
      
        // If the name is found,
        if (occurs >= 0) {
      
          // append the current value to its list of values.
          o[occurs].weekendDates = o[occurs].weekendDates.concat(cur.weekendDates);
      
          // Otherwise,
        } else {
      
          // add the current item to o (but make sure the value is an array).
          var obj = {
            name: cur.name,
            userId: cur.userId,
            weekendDates: [cur.weekendDates]
          };
          o = o.concat([obj]);
        }
      
        return o;
      }, []);
      
      console.log(output);
}

sortGruppirovkaHolidays();