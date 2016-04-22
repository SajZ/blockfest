Template.flyer.helpers({
	ipfsImage: function () {
		return ("https://upload.wikimedia.org/wikipedia/en/1/18/Ipfs-logo-1024-ice-text.png");
	},
	titleImage: function () {
		var titles = 3;
		var rand = Math.floor(Math.random() * (titles)) + 1;
		return ("titles/" + rand + ".png");
	}
});

Template.flyer.events({
	"click #flyer-upload": function (event) {
		event.preventDefault();
		Session.set("upload-flyer", true);
	},
	"click #upload-close": function (event) {
		event.preventDefault();
		Session.set("upload-flyer", false);
	}
});

Template.flyer.onRendered(function () {
	var dir = "QmSmjERBMSesWAMPXkzvt8DRYLNWJfHW9WZS9ZVkozgRhL";
	var request = "https://gateway.ipfs.io/api/v0/object/get?arg=" + dir;
	Meteor.http.get(request, function (err, res) {
		if (!err)
		{
			var links = JSON.parse(res.content)["Links"];
			var rand = Math.floor(Math.random() * (links.length));
			var src = "http://ipfs.io/ipfs/" + links[rand]["Hash"];
			$("#cover").attr("src", src);
		}
		else
			console.log(err);
	});
});