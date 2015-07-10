package be.cgi.app.index.controller

import be.cgi.app.common.auth.support.CGIBasicAuthSupport
import be.cgi.app.index.dao.IndexDAO
import be.cgi.app.index.model.IndexModel
import be.cgi.context._
import com.mongodb.casbah.commons.MongoDBObject
import com.novus.salat.grater
import org.json4s.DefaultFormats
import org.json4s.mongo.ObjectIdSerializer
import org.scalatra.ScalatraServlet
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.swagger.{Swagger, SwaggerSupport}

/**
 * Created by nicktombeur on 08/05/15.
 */
// This Controller is just an example and it will be removed later on...
class IndexController(implicit val swagger: Swagger) extends ScalatraServlet with SwaggerSupport with CGIBasicAuthSupport
  with JacksonJsonSupport {

  implicit val jsonFormats = DefaultFormats + new ObjectIdSerializer
  protected val applicationDescription = "All the end-points for the index page"

  before() {
    contentType = formats("json")
    // Auth all the calls
    //basicAuth
  }

  val test = (apiOperation[List[IndexModel]]("getAll")
    summary "Show all test"
    notes "Show all test ....")

  get("/", operation(test)) {
    val indexDAO = new IndexDAO
    val indexes: List[IndexModel] = indexDAO.find(MongoDBObject.empty).toList

    grater[IndexModel].toJSONArray(indexes)
  }

  /*
  post("/add") {
    basicAuth
    val key = params("key")
    val value = params("value")
    val newObj = MongoDBObject(key -> value)
    mongoColl += newObj
  }*/
}
