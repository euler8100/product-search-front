import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;

Client client = ClientBuilder.newClient();
Entity payload = Entity.json("{
  \"recipientPhone\" : {
    \"countryCode\" :\"HT\",
    \"number\" :\"+50936377111\" //(Note the "+509" country dialing code for Haiti)
  },
  \"senderPhone\" : {
    \"countryCode\" : \"US\",
    \"number\" : \"+13059547862\" //(Note the "+1" country dialing code for USA)
  },
  \"operatorId\" : 173 ,
  \"amount\" :  15,
  \"customIdentifier\" : \"transaction by john@example.com"
}");

Response response = client.target( "https://topups.reloadly.com/topups" )
 .request (MediaType.APPLICATION_JSON_TYPE)
 .header ("Accept", "application/com.reloadly.topups-v1+json" )
 .header ("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik0wWXpRa" )
 .post (payload);

System.out.println ("status: "  +  response. getStatus());
System.out.println ("headers: "  +  response. getHeaders());
System.out.println ("body: " +  response. readEntity( String.class ));   