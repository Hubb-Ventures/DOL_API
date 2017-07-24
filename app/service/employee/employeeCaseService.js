var http = require("https");

module.exports.getDetail = function(req, resp){
	var body = req.body,
		caseType = body.caseType,
		urlPath = "",
		employeeName = body.employeeName;

	if(employeeName && (caseType==="All"||caseType==="PERM"||caseType==="H-1B"||caseType==="H-1B1 Chile"||caseType==="H-1B1 Singapore"||caseType==="E-3 Australian"||caseType==="H-2A"||caseType==="H-2B") ){
		employeeName = encodeURIComponent(employeeName);
		console.log(employeeName);
		
		if(caseType==="All"){
			caseType="";
		} else if(caseType === "PERM"){
			caseType=6;
		} else if(caseType === "H-1B"){
			caseType=1;
		} else if(caseType === "H-1B1 Chile"){
			caseType=2;
		} else if(caseType === "H-1B1 Singapore"){
			caseType=3;
		} else if(caseType === "E-3 Australian"){
			caseType=4;
		} else if(caseType === "H-2A"){
			caseType=8;
		} else if(caseType === "H-2B"){
			caseType=7;
		}

		var options = {
		  "method": "GET",
		  "hostname": "lcr-pjr.doleta.gov",
		  "port": null,
		  "path": "/index.cfm?event=ehLCJRExternal.dspQuickCertSearchGridData&&startSearch=1&case_number=&employer_business_name="+employeeName+"&visa_class_id="+ caseType +"&state_id=all&location_range=10&location_zipcode=&job_title=&naic_code=&create_date=undefined&post_end_date=undefined&h1b_data_series=ALL&start_date_from=&start_date_to=&end_date_from=mm/dd/yyyy&end_date_to=mm/dd/yyyy&nd=1499959786410&page=1&rows=20&sidx=create_date&sord=desc&nd=1499959786410&_search=false",
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
		    var rows = body["ROWS"][0];
		    var responses = [];

		    for(row in rows){
		    	var json = rows;
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
			    responses.push(response);
		    }
		    resp.status(200).send(responses);
		  });

		});
		req.end();

	} else {
		resp.status(401).send({"msg": "Invalid Request"});
	}

}