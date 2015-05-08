package be.cgi.app.common.stack

import be.cgi.app.common.swagger.CowGameSwagger

/**
 * Created by nicktombeur on 08/05/15.
 */
trait CommonStack {

  final val BasePath = "/api/"
  final val DocsPath = "/api-docs"
  final val DbName = "cow_game"

  // TestCollection
  final val TestCollection = "test"
  final val TestPath = BasePath + "*"

  implicit val swagger = new CowGameSwagger

}
