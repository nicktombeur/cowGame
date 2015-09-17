package be.cgi.app.common.validation

import org.bson.types.ObjectId
import org.scalatra.commands.FieldDescriptor
import org.scalatra.validation.Validators.PredicateValidator

/**
 * Created by nick on 9/17/15.
 */
class ObjectIdValidation(b: FieldDescriptor[ObjectId]) {
  def validateObjectId() = {
    b.validateWith(_ => _ flatMap {
      new PredicateValidator[ObjectId](b.name, !_.toString.isEmpty, "Invalid ObjectId").validate
    })
  }
}
