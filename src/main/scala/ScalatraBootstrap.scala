import be.cgi.app.common.swagger.{CowGameSwagger, ResourcesApp}
import be.cgi.app.index.controller.IndexController
import org.scalatra._
import javax.servlet.ServletContext

class ScalatraBootstrap extends LifeCycle {

  final val BasePath = "/api/"
  final val DocsPath = "/api-docs"
  final val TestPath = BasePath + "*"

  implicit val swagger = new CowGameSwagger

  override def init(context: ServletContext) {
    context.mount(new IndexController, TestPath)
    context.mount(new ResourcesApp, DocsPath)
  }
}
