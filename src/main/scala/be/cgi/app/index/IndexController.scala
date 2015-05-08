package be.cgi.app.index

import be.cgi.app.common.json.SimpleMongoDbJsonConversion
import com.mongodb.casbah.MongoCollection
import com.mongodb.casbah.commons.MongoDBObject
import org.json4s.{Formats, DefaultFormats}
import org.scalatra.ScalatraServlet
import org.scalatra.swagger.{Swagger, SwaggerSupport}

/**
 * Created by nicktombeur on 08/05/15.
 */
// This Controller is just an example and it will be removed later on...
class IndexController(val mongoColl: MongoCollection)(implicit val swagger: Swagger)
  extends ScalatraServlet with SimpleMongoDbJsonConversion with SwaggerSupport {

  protected implicit val jsonFormats: Formats = DefaultFormats
  protected val applicationDescription = "All the end-points for the index page"

  before() {
    contentType = formats("json")
  }

  val test = (apiOperation[List[IndexModel]]("getTest")
    summary "Show all test"
    notes "Show all test ....")

  get("/test", operation(test)) {
    contentType = formats("json")
    IndexModel("This is a test...")
  }

  get("/") {
    mongoColl.find()
    for {
      x <- mongoColl
    } yield x
  }

  post("/add") {
    val key = params("key")
    val value = params("value")
    val newObj = MongoDBObject(key -> value)
    mongoColl += newObj
  }
}
