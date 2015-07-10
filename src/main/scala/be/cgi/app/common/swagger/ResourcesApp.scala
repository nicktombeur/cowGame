package be.cgi.app.common.swagger

import org.scalatra.ScalatraServlet
import org.scalatra.swagger.{NativeSwaggerBase, Swagger}

/**
 * Created by nick on 7/10/15.
 */
class ResourcesApp(implicit val swagger: Swagger) extends ScalatraServlet with NativeSwaggerBase
