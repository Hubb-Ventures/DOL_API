var http = require("https");

module.exports.getDetail = function(req, resp){
	var data = req.params,
		urlPath = "",
		caseNumber = data.caseNumber;

	if(caseNumber){
		console.log(caseNumber);

		var options = {
		  "method": "GET",
		  "hostname": "lcr-pjr.doleta.gov",
		  "port": null,
		  "path": "/index.cfm?event=ehLCJRExternal.dspQuickCertSearchGridData&startSearch=1&case_number="+ caseNumber +"&employer_business_name=&visa_class_id=&state_id=all&location_range=10&location_zipcode=&job_title=&naic_code=&create_date=undefined&post_end_date=undefined&h1b_data_series=ALL&start_date_from=&start_date_to=&end_date_from=mm%2Fdd%2Fyyyy&end_date_to=mm%2Fdd%2Fyyyy&nd=1499959786410&nd=1499959786410&page=1&rows=20&sidx=create_date&sord=desc&_search=false",
		  "headers": {
		    "cache-control": "no-cache"
		  }
		};

		var req = http.request(options, function(res) {
		  var chunks = [];

		  res.on("data", function (chunk) {
		  	chunks.push(chunk);
		  });

		  res.on("end", function () {
		  	var body = JSON.parse(chunks);
		    console.log(body);
		    var json = body["ROWS"][0];
		    var response = {
		    	caseNumber: json[1],
		    	postingDate: json[2],
		    	caseType: json[3],
		    	status: json[4],
		    	businessName: json[5],
		    	startDate: json[6],
		    	endDate: json[7],
		    	jobTitle: json[8],
		    	state: json[9],
		    	documentURL: "https://lcr-pjr.doleta.gov/index.cfm?event=ehLCJRExternal.dspCert&doc_id=3&visa_class_id=" + json[10] + "&id=" + json[0]
		    };
		    resp.status(200).send(response);
		  });

		});

		req.end();
	}

}