import be.cgi.app.common.swagger.{CowGameSwagger, ResourcesApp}
import be.cgi.app.event.controller.EventController
import org.scalatra._
import javax.servlet.ServletContext

class ScalatraBootstrap extends LifeCycle {

  final val BasePath = "/api/"
  final val DocsPath = "/api-docs"
  final val EventPath = BasePath + "event/*"

  implicit val swagger = new CowGameSwagger

  override def init(context: ServletContext) {
    context.mount(new EventController, EventPath, "api/event")
    context.mount(new ResourcesApp, DocsPath)
  }
}
