var sqlite3 = require('sqlite3');

function dbcreate(projectname) {
  var db = new sqlite3.Database(projectname + '.db');
  db.serialize(function() {
    db.run("CREATE TABLE if not exists Nodes (NodeID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, ParentID INTEGER NOT NULL, NodeName TEXT NOT NULL UNIQUE)");
    db.run("CREATE TABLE if not exists NodeClosures (ParentID INTEGER NOT NULL, ChildID INTEGER NOT NULL, Depth INTEGER NOT NULL)");

    var stmt = db.prepare("INSERT INTO Nodes (ParentID, NodeName) VALUES (?, ?)");
    for (var i = 1; i < 4; i++) {
      stmt.run(i, "Ipsum " + i);
    }
    stmt.finalize();

    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (1, 1, 0)");
    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (2, 2, 0)");
    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (3, 3, 0)");
    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (1, 2, 1)");
    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (2, 3, 1)");
    db.run("INSERT INTO NodeClosures (ParentID, ChildID, Depth) VALUES (1, 3, 2)");

  });

  db.close();
}

//dbcreate("abc");
