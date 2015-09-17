package be.cgi.app.common.validation

import org.bson.types.ObjectId
import org.json4s.DefaultFormats
import org.json4s.mongo.ObjectIdSerializer
import org.scalatra.commands.{FieldDescriptor, JsonCommand}

/**
 * Created by nick on 9/17/15.
 */
abstract class BaseCommand extends JsonCommand {
  protected implicit val jsonFormats = DefaultFormats + new ObjectIdSerializer

  implicit def objectIdValidator(b: FieldDescriptor[ObjectId]): ObjectIdValidation = new ObjectIdValidation(b)
}
