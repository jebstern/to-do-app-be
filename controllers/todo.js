const Item = require("../models/item");
// const { OAuth2Client } = require("google-auth-library");
// const token = require("../token");
const { v4 } = require("uuid");

exports.update = function(req, res) {
  const updatedItem = req.body;

  Item.findOneAndUpdate(
    { id: updatedItem.id },
    {
      id: updatedItem.id,
      dueDate: updatedItem.dueDate,
      title: updatedItem.title,
      text: updatedItem.text,
      completed: updatedItem.completed
    },
    { new: true, fields: { _id: 0, __v: 0 } },
    function(err, doc) {
      if (err) {
        return res.status(500).send({ mode: "upsert", error: err });
      }
      return res.status(200).send(doc);
    }
  );
};

exports.items = function(req, res) {
  Item.find({}, "-_id -__v", function(err, items) {
    if (err) {
      return res.status(500).send({ mode: "find", error: err });
    }
    res.status(200).send(items);
  });
};

exports.incomplete = function(req, res) {
  Item.find({ completed: false }, "-_id -__v", function(err, items) {
    if (err) {
      return res.status(500).send({ mode: "find", error: err });
    }
    res.status(200).send(items);
  });
};

exports.add = function(req, res) {
  const newItem = req.body;

  Item.findOneAndUpdate(
    {id: ""},
    {
      id: v4(),
      dueDate: newItem.dueDate,
      title: newItem.title,
      text: newItem.text,
      completed: false
    },
    { upsert: true, new: true, fields: { _id: 0, __v: 0 } },
    function(err, doc) {
      if (err) {
        return res.status(500).send({ mode: "delete", error: err });
      } else if (doc === null || doc === undefined) {
        return res.status(500).send({
          "MongoDB error": "The specified document was not inserted!"
        });
      } else {
        res.status(200).send(doc);
      }
    }
  );
};

exports.delete = function(req, res) {
  Item.deleteOne({ id: req.params.id }, function(err, obj) {
    if (err) {
      return res.status(500).send({ mode: "delete", error: err });
    } else if (obj.n === 0) {
      return res
        .status(500)
        .send({ "MongoDB error": "The specified document was not found!" });
    } else {
      return res.status(204).send();
    }
  });
};

/*
exports.get_user = function (req, res) {
    const username = req.params.username;
    User.findOne({
        username
    }, function (err, userData) {
        if (userData != null && userData.locations != null) {
            res.status(200).send(userData.locations);
        } else {
            res.status(200).send([]);
        }
    });
};

exports.verifyToken = function (req, res) {
  verify(req.body.token)
    .then(resp => resp !== null ? res.status(200).send({token: resp}) : res.status(401).send())
    .catch(err => {
      console.log(err);
      res.status(401).send();
    });
};


async function verify(token) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENTID
  });
  const payload = ticket.getPayload();
  const audience = payload["aud"];
  if (audience === process.env.GOOGLE_CLIENTID) {
    const userid = payload["sub"];
    jwtToken = generateUserToken(userid);
    return jwtToken;
  } else {
    return null;
  }
}

// Generate the Token for the user authenticated in the request
function generateUserToken(userId) {
  return token.generateAccessToken(userId);
}
*/
