package be.cgi.app.event.validation

import be.cgi.app.common.validation.BaseCommand
import org.scalatra.commands._

/**
 * Created by nick on 9/17/15.
 */
class EventCommand extends BaseCommand {
  val name: Field[String] = asType[String]("name").notBlank
  val maxX: Field[Int] = asType[Int]("maxX").required
  val maxY: Field[Int] = asType[Int]("maxY").required
}


