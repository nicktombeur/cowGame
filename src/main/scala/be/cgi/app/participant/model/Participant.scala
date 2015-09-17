package be.cgi.app.participant.model

import be.cgi.app.common.model.Point
import org.bson.types.ObjectId

/**
 * Created by nick on 9/17/15.
 */
case class Participant(_id: ObjectId = new ObjectId,
                       eventId: ObjectId,
                       point: Point,
                       firstName: String,
                       lastName: String)
