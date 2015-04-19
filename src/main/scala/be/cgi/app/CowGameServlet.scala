package be.cgi.app

import org.scalatra._
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.swagger._

class CowGameServlet(implicit val swagger: Swagger) extends ScalatraServlet with NativeJsonSupport with SwaggerSupport {

  protected implicit val jsonFormats: Formats = DefaultFormats
  protected val applicationDescription = "The Cow game API. It exposes operations for browsing and searching list of ..., and retrieving ..."

  before() {
    contentType = formats("json")
  }

  val test = (apiOperation[List[Test]]("getTest")
    summary "Show all test"
    notes "Show all test ....")

  get("/test", operation(test)) {
    contentType = formats("json")
    Test("This is a test..")
  }

}


