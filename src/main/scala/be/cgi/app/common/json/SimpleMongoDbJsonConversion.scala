package be.cgi.app.common.json

import com.mongodb.casbah.Imports._
import org.scalatra._

trait SimpleMongoDbJsonConversion extends ScalatraBase with ApiFormats {

  // renders DBObject and MongoCursor as String making use of standard toString() methods
  def renderMongo = {
    case dbo: DBObject =>
      contentType = formats("json")
      dbo.toString

    case xs: TraversableOnce[_] => // handles a MongoCursor
      contentType = formats("json")
      val l = xs map (x => x.toString) mkString(",")
      "[" + l + "]"

  }: RenderPipeline

  // hook into render pipeline
  override protected def renderPipeline = renderMongo orElse super.renderPipeline

}
