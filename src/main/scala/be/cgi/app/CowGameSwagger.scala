package be.cgi.app

import org.scalatra.ScalatraServlet
import org.scalatra.swagger.{NativeSwaggerBase, ApiInfo, Swagger}

/**
 * Created by nick on 3/27/15.
 */
class ResourcesApp(implicit val swagger: Swagger) extends ScalatraServlet with NativeSwaggerBase

object CowGameApiInfo extends ApiInfo(
    "The Cow game API",
    "Docs for the Cow game API",
    "http://www.something.com",
    "awesome@something.com",
    "MIT",
    "http://www.license.com/my/license")

class CowGameSwagger extends Swagger(Swagger.SpecVersion, "1.0.0", CowGameApiInfo)
