import be.cgi.app.common.stack.CommonStack
import be.cgi.app.common.swagger.ResourcesApp
import be.cgi.app.index.IndexController
import com.mongodb.casbah.MongoClient
import org.scalatra._
import javax.servlet.ServletContext

class ScalatraBootstrap extends LifeCycle with CommonStack {

  override def init(context: ServletContext) {
    val mongoClient = MongoClient()
    val mongoColl = mongoClient(DbName)

    context.mount(new IndexController(mongoColl(TestCollection)), TestPath)
    context.mount(new ResourcesApp, DocsPath)
  }
}
