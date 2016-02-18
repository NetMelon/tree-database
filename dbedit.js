var sqlite3 = require('sqlite3').verbose(); //verbose is only for debugging, delete in production

function nodecreate(projectname, name, parent, child, depth) {
  var db = new sqlite3.Database(projectname + '.db');
  db.serialize(function() {
    db.run("INSERT INTO Nodes (NodeID, ParentID, NodeName) VALUES (?," + parent + ", " + name + ")");
    db.get("SELECT * from Nodes ORDER BY NodeID DESC LIMIT 1", function(err, row) {
        if (err)
            console.log(err);
        else
            console.log(row.NodeID);
            db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (" + row.NodeID + ", " + row.NodeID + ", 0)");
            var stmt = db.prepare("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (?, ?, ?)");
            for (var i = 1; i < 4; i++) {
              stmt.run(i, "Ipsum " + i);
            }
            stmt.finalize();
    });


    db.run("INSERT INTO Nodes (NodeID, ParentID, NodeName) VALUES (?, 1, New)");


/*    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (" + parent + ", " + child + ", " + depth + ")");

    var stmt = db.prepare("INSERT INTO Nodes (ParentID, NodeName) VALUES (?, ?)");
    for (var i = 1; i < 4; i++) {
      stmt.run(i, "'Ipsum " + i + "'");
    }
    stmt.finalize();
*/

    /*
    insert into closure(parent, child, depth)
    select p.parent, c.child, p.depth+c.depth+1
      from closure p, closure c
     where p.child=PARENT_ITEM and c.parent=CHILD_ITEM
    */
  });

  db.close();
}

nodecreate("abc", 1, 22, 2);


/*
//Load modules
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./database_name.db');

//Perform SELECT Operation
db.all("SELECT * from blah blah blah where this="+that,function(err,rows){
//rows contain values while errors, well you can figure out.
});

//Perform INSERT operation.
db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

//Perform DELETE operation
db.run("DELETE * from table_name where condition");

//Perform UPDATE operation
db.run("UPDATE table_name where condition");
*/


/*
var sqlite3 = require('sqlite3').verbose();
var file = "hr";
var db = new sqlite3.Database(file);
db.all("SELECT first_name,last_name FROM employees", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.first_name, row.last_name);
        })
    });
db.close();
*/

/*
var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);
*/

/**/

/**/

/**/

/**/
