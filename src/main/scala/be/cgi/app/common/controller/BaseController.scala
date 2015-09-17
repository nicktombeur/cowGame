package be.cgi.app.common.controller

import be.cgi.app.common.auth.support.CGIBasicAuthSupport
import org.json4s.DefaultFormats
import org.json4s.mongo.ObjectIdSerializer
import org.scalatra.ScalatraServlet
import org.scalatra.commands.JacksonJsonParsing
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.swagger.SwaggerSupport

/**
 * Created by nick on 7/10/15.
 */
trait BaseController extends ScalatraServlet with SwaggerSupport with CGIBasicAuthSupport with JacksonJsonSupport
  with JacksonJsonParsing {

  implicit val jsonFormats = DefaultFormats + new ObjectIdSerializer

  before() {
    contentType = formats("json")
  }

}
