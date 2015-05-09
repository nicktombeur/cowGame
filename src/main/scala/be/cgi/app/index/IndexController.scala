package be.cgi.app.index

import be.cgi.app.common.auth.support.CGIBasicAuthSupport
import be.cgi.app.common.json.SimpleMongoDbJsonConversion
import com.mongodb.casbah.MongoCollection
import com.mongodb.casbah.commons.MongoDBObject
import org.json4s.{Formats, DefaultFormats}
import org.scalatra.ScalatraServlet
import org.scalatra.json.{JacksonJsonSupport, NativeJsonSupport}
import org.scalatra.swagger.{Swagger, SwaggerSupport}

/**
 * Created by nicktombeur on 08/05/15.
 */
// This Controller is just an example and it will be removed later on...
class IndexController(val mongoColl: MongoCollection)(implicit val swagger: Swagger)
  extends ScalatraServlet with SwaggerSupport with CGIBasicAuthSupport
  with JacksonJsonSupport {

  protected implicit val jsonFormats: Formats = DefaultFormats
  protected val applicationDescription = "All the end-points for the index page"

  before() {
    contentType = formats("json")
    // Auth all the calls
    //basicAuth
  }

  val test = (apiOperation[List[IndexModel]]("getTest")
    summary "Show all test"
    notes "Show all test ....")

  get("/test", operation(test)) {
    contentType = formats("json")
    IndexModel("This is a test...")
  }

  get("/") {
    basicAuth
    mongoColl.find()
    for {
      x <- mongoColl
    } yield x.toString
  }

  post("/add") {
    basicAuth
    val key = params("key")
    val value = params("value")
    val newObj = MongoDBObject(key -> value)
    mongoColl += newObj
  }
}
