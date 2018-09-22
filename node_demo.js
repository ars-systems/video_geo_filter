var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "VideoDB"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "select Video.name ,( case   when Country.name=\"Armenia\" and Country_Block.block=\"1\" then null       else  Video.url      END      )as url,      (        case         when Country.name=\"Armenia\" then Country_Block.block        else null        END       ) as block        from Video            left join Country_Block on Video.id = Country_Block.video_id                        left join Country on Country.id = Country_Block.country_id;\n";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        console.log("1 record inserted");
    });
});



