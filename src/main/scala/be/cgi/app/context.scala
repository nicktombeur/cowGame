package be.cgi

import com.novus.salat.{ TypeHintFrequency, StringTypeHintStrategy, Context }
import com.novus.salat.json._
import org.joda.time.format.ISODateTimeFormat
import org.joda.time.DateTimeZone

/**
 * Created by nick on 7/10/15.
 */
package object context {
  implicit val ctx = new Context {
    val name = "json-test-context"
    override val typeHintStrategy = StringTypeHintStrategy(when = TypeHintFrequency.WhenNecessary,
      typeHint = "_t")
    override val jsonConfig = JSONConfig(
      dateStrategy = StringDateStrategy(dateFormatter = ISODateTimeFormat.dateTime.withZone(DateTimeZone.forID("US/Eastern"))),
      objectIdStrategy = StringObjectIdStrategy)
  }
}
