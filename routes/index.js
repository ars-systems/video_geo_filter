var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/videos', function(req, res, next) {

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
        var sql = "select Video.name ,     ( case       when Country.name=\""+req.body.country+"\" and Country_Block.block=\"1\" then null       else  Video.url      END      )as url,      (        case         when Country.name=\""+req.body.country+"\" then Country_Block.block        else null        END       ) as block        from Video            left join Country_Block on Video.id = Country_Block.video_id                        left join Country on Country.id = Country_Block.country_id;\n";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            console.log(result);
              res.render('videos',{data:result});
        });
    });



});
router.get('/', function(req, res, next) {

    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "VideoDB"
    });

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM Country", function (err, result, fields) {
            if (err) throw err;
            res.render('index', {data : result[0]['country'] });
        });
    });

});
var multer = require('multer');


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/videos");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);


    }
});

var upload = multer({storage: Storage}).array("imgUploader", 3); //Field name and max count


router.post("/api/Upload", function (req, res) {
    console.log("hhhh");
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
        }
        res.render('index', { title: 'Express' });
    });
});

module.exports = router;
