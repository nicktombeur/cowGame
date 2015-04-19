import be.cgi.app._
import org.scalatra._
import javax.servlet.ServletContext

class ScalatraBootstrap extends LifeCycle {

  implicit val swagger = new CowGameSwagger

  override def init(context: ServletContext) {
    context.mount(new CowGameServlet, "/api/*")
    context.mount(new ResourcesApp, "/api-docs")
  }
}
