import be.cgi.app.common.swagger.{CowGameSwagger, ResourcesApp}
import be.cgi.app.event.controller.EventController
import be.cgi.app.participant.controller.ParticipantController
import org.scalatra._
import javax.servlet.ServletContext

class ScalatraBootstrap extends LifeCycle {

  val BasePath = "/api/"
  val DocsPath = "/api-docs"
  val EventPath = BasePath + "event/*"
  val ParticipantPath = BasePath + "participant/*"

  implicit val swagger = new CowGameSwagger

  override def init(context: ServletContext) {
    context.mount(new EventController, EventPath, "api/event")
    context.mount(new ParticipantController, ParticipantPath, "api/participant")
    context.mount(new ResourcesApp, DocsPath)
  }
}
