export const HARDCODED_TYPES: { [s: string]: { [k: string]: string | null } } =
  {
    "playdate.getSystemMenu": {
      __return: "pd_menu",
    },
    "playdate.graphics.lockFocus": {
      __return: null,
    },
    "table.indexOfElement": {
      __return: "number?",
    },
    "table.getsize": {
      __return: "(number, number)",
    },
    "table.shallowcopy": {
      source: "table",
      destination: "table",
      __return: "table",
    },
    "table.deepcopy": {
      source: "table",
      __return: "table",
    },
    "playdate.getTime": {
      __return: "pd_time_table",
    },
    "playdate.getGMTTime": {
      __return: "pd_time_table",
    },
    "playdate.epochFromTime": {
      time: "pd_time_table",
    },
    "playdate.epochFromGMTTime": {
      time: "pd_time_table",
    },
    "playdate.timeFromEpoch": {
      __return: "pd_time_table",
    },
    "playdate.GMTTimeFromEpoch": {
      __return: "pd_time_table",
    },
    "table.create": {
      __return: "table",
    },
    "playdate.apiVersion": {
      __return: "(number, number)",
    },
    "playdate.setMenuImage": {
      xOffset: "number",
    },
    "playdate.getSystemLanguage": {
      __return: "pd_language",
    },
    "playdate.readAccelerometer": {
      __return: "(number, number, number)",
    },
    "playdate.getButtonState": {
      __return: "(integer, integer, integer)",
    },
    "playdate.getCrankPosition": {
      __return: "number",
    },
    "playdate.getCrankChange": {
      __return: "(number, number)",
    },
    "playdate.getCrankTicks": {
      ticksPerRevolution: "number",
    },
    "playdate.cranked": {
      change: "number",
      acceleratedChange: "number",
    },
    "playdate.getFPS": {
      __return: "number",
    },
    "playdate.getBatteryPercentage": {
      __return: "number",
    },
    "playdate.getBatteryVoltage": {
      __return: "number",
    },
    "playdate.setDebugDrawColor": {
      r: "number",
      g: "number",
      b: "number",
      a: "number",
    },
    "playdate.keyPressed": {
      key: "string",
    },
    "playdate.keyReleased": {
      key: "string",
    },
    "playdate.menu:addCheckmarkMenuItem": {
      __return: "pd_item",
    },
    "playdate.menu:addOptionsMenuItem": {
      options: "string[]",
      initalValue: "string",
      __return: "pd_item",
    },
    "playdate.menu:getMenuItems": {
      __return: "pd_item[]",
    },
    "playdate.menu:removeMenuItem": {
      menuItem: "pd_item",
    },
    "playdate.menu.item:setValue": {
      newValue: "integer|boolean|string",
    },
    "playdate.menu.item:getValue": {
      __return: "integer|boolean|string",
    },
    "playdate.inputHandlers.push": {
      handler: "pd_input_handler",
      masksPreviousHandlers: "boolean",
    },
    "playdate.display.getScale": {
      __return: "number",
    },
    "playdate.display.getMosaic": {
      __return: "(number, number)",
    },
    "playdate.display.getOffset": {
      __return: "(number, number)",
    },
    "playdate.file.open": {
      mode: "pd_filemode",
      __return: "pd_file",
    },
    "playdate.file.listFiles": {
      showhidden: "boolean",
      __return: "string[]",
    },
    "playdate.file.getSize": {
      __return: "number",
    },
    "playdate.file.getType": {
      __return: "",
    },
    "playdate.file.modtime": {
      __return: "",
    },
    "playdate.file.rename": {
      newPath: "string",
    },
    "playdate.file.load": {
      env: "table",
      __return: "fun()",
    },
    "playdate.file.run": {
      env: "table",
      __return: null,
    },
    "playdate.geometry.squaredDistanceToPoint": {
      __return: "number",
    },
    "playdate.geometry.distanceToPoint": {
      __return: "number",
    },
    "playdate.graphics.setLineCapStyle": {
      style: "pd_line_cap_style",
    },
    "playdate.graphics.drawArc": {
      arc: "pd_arc",
    },
    "playdate.graphics.drawCircleAtPoint": {
      p: "pd_point",
    },
    "playdate.graphics.fillCircleAtPoint": {
      p: "pd_point",
    },
    "playdate.graphics.drawPolygon": {
      p: "pd_polygon",
    },
    "playdate.graphics.fillPolygon": {
      p: "pd_polygon",
    },
    "playdate.graphics.setPolygonFillRule": {
      rule: "pd_polygon_fill_rule",
    },
    "playdate.graphics.perlin": {
      z: "number",
      repeat: "number",
      octaves: "number",
      persistence: "number",
      __return: "number",
    },
    "playdate.graphics.perlinArray": {
      z: "number",
      dz: "number",
      repeat: "number",
      octaves: "number",
      persistence: "number",
      __return: "number[]",
    },
    "playdate.graphics.generateQRCode": {
      stringToEncode: "string",
      desiredEdgeDimension: "number",
      callback: "fun(image: pd_image)",
      __return: "pd_timer",
    },
    "playdate.graphics.drawSineWave": {
      startAmplitude: "number",
      endAmplitude: "number",
      period: "number",
      phaseShift: "number",
    },
    "playdate.graphics.setStencilImage": {
      tile: "boolean",
    },
    "playdate.graphics.setStencilPattern": {
      level: "number",
    },
    "playdate.graphics.setStrokeLocation": {
      location: "pd_stroke_location",
    },
    "playdate.graphics.getStrokeLocation": {
      __return: "pd_stroke_location",
    },
    "playdate.graphics.getDrawOffset": {
      __return: "(number, number)",
    },
    "playdate.graphics.getFont": {
      __return: "pd_font",
    },
    "playdate.graphics.getSystemFont": {
      __return: "pd_font",
    },
    "playdate.graphics.drawText": {
      __return: "(number, number)",
    },
    "playdate.graphics.drawLocalizedText": {
      key: "string",
    },
    "playdate.graphics.getLocalizedText": {
      key: "string",
    },
    "playdate.graphics.getTextSize": {
      str: "string",
    },
    "playdate.graphics.drawTextInRect": {
      __return: "(number, number, boolean)",
    },
    "playdate.graphics.imageWithText": {
      __return: "(pd_image, boolean)",
    },
    "playdate.keyboard.setCapitalizationBehavior": {
      behavior: "pd_capitalization",
    },
    "playdate.keyboard.left": {
      __return: "number",
    },
    "playdate.keyboard.width": {
      __return: "number",
    },
    "playdate.math.lerp": {
      t: "number",
    },
    "playdate.simulator.getURL": {
      url: "string",
      __return: "string",
    },
    "playdate.sound.playingSources": {
      __return: "pd_source[]",
    },
    "playdate.timer.keyRepeatTimer": {
      __return: "pd_timer",
    },
    "playdate.timer.keyRepeatTimerWithDelay": {
      delayAfterInitialFiring: "number",
      delayAfterSecondFiring: "number",
      __return: "pd_timer",
    },
    "playdate.timer.allTimers": {
      __return: "pd_timer[]",
    },
    "playdate.frameTimer.allTimers": {
      __return: "pd_frameTimer[]",
    },
    "playdate.menu.item:setTitle": {
      newTitle: "string",
    },
    "playdate.menu.item:getTitle": {
      __return: "string",
    },
    "playdate.file.file:readline": {
      __return: "string",
    },
    "playdate.file.file:read": {
      numberOfBytes: "number",
      __return: "",
    },
    "playdate.file.file:seek": {
      offset: "number",
    },
    "playdate.file.file:tell": {
      __return: "number",
    },
    "playdate.geometry.affineTransform.new": {
      m11: "number",
      m12: "number",
      m21: "number",
      m22: "number",
      tx: "number",
      ty: "number",
    },
    "playdate.sound.getHeadphoneState": {
      changeCallback: "nil | (fun(boolean, boolean))",
      __return: "(boolean, boolean)",
    },
    "playdate.sound.setOutputsActive": {
      headphones: "boolean",
      speaker: "boolean",
    },
    "playdate.sound.getCurrentTime": {
      __return: "number",
    },
    "playdate.geometry.affineTransform:concat": {
      af: "pd_affineTransform",
    },
    "playdate.geometry.affineTransform:transformedPoint": {
      p: "pd_point",
      __return: "pd_point",
    },
    "playdate.geometry.affineTransform:transformXY": {
      __return: "(number, number)",
    },
    "playdate.geometry.affineTransform:transformLineSegment": {
      ls: "pd_lineSegment",
    },
    "playdate.geometry.affineTransform:transformedLineSegment": {
      ls: "pd_lineSegment",
      __return: "pd_lineSegment",
    },
    "playdate.geometry.affineTransform:transformAABB": {
      r: "pd_rect",
    },
    "playdate.geometry.affineTransform:transformedAABB": {
      r: "pd_rect",
      __return: "pd_rect",
    },
    "playdate.geometry.affineTransform:transformPolygon": {
      p: "pd_polygon",
    },
    "playdate.geometry.affineTransform:transformedPolygon": {
      p: "pd_polygon",
      __return: "pd_polygon",
    },
    "playdate.geometry.arc.new": {
      direction: "boolean",
    },
    "playdate.geometry.arc:pointOnArc": {
      distance: "number",
    },
    "playdate.geometry.lineSegment:unpack": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.lineSegment:pointOnLine": {
      distance: "number",
    },
    "playdate.geometry.lineSegment:intersectsLineSegment": {
      ls: "pd_lineSegment",
    },
    "playdate.geometry.lineSegment:intersectsPolygon": {
      poly: "pd_polygon",
      __return: "(boolean, pd_point[])",
    },
    "playdate.geometry.lineSegment:intersectsRect": {
      __return: "(boolean, pd_point[])",
    },
    "playdate.geometry.point:unpack": {
      __return: "(number, number)",
    },
    "playdate.geometry.point:squaredDistanceToPoint": {
      __return: "number",
    },
    "playdate.geometry.point:distanceToPoint": {
      __return: "number",
    },
    "playdate.geometry.polygon.new": {
      p1: "pd_point",
      p2: "pd_point",
      numberOfVertices: "number",
    },
    "playdate.geometry.polygon:copy": {
      __return: "pd_polygon",
    },
    "playdate.geometry.polygon:containsPoint": {
      fillRule: "pd_polygon_fill_rule",
    },
    "playdate.geometry.polygon:getBounds": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.polygon:length": {
      __return: "number",
    },
    "playdate.geometry.polygon:setPointAt": {
      n: "number",
    },
    "playdate.geometry.polygon:getPointAt": {
      n: "number",
      __return: "pd_point",
    },
    "playdate.geometry.polygon:intersects": {
      p: "pd_polygon",
    },
    "playdate.geometry.polygon:pointOnPolygon": {
      distance: "number",
    },
    "playdate.geometry.rect.fast_intersection": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.rect.fast_union": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.rect:unpack": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.rect:intersection": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:union": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:insetBy": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:offsetBy": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:centerPoint": {
      __return: "pd_point",
    },
    "playdate.geometry.size:unpack": {
      __return: "(number, number)",
    },
    "playdate.geometry.vector2D:unpack": {
      __return: "(number, number)",
    },
    "playdate.geometry.vector2D:scale": {
      s: "number",
    },
    "playdate.geometry.vector2D:scaledBy": {
      s: "number",
      __return: "pd_vector2D",
    },
    "playdate.geometry.vector2D:dotProduct": {
      __return: "number",
    },
    "playdate.geometry.vector2D:magnitude": {
      __return: "number",
    },
    "playdate.geometry.vector2D:magnitudeSquared": {
      __return: "number",
    },
    "playdate.geometry.vector2D:angleBetween": {
      __return: "number",
    },
    "playdate.graphics.image:load": {
      __return: "(boolean, string?)",
    },
    "playdate.graphics.image:drawAnchored": {
      ax: "number",
      ay: "number",
    },
    "playdate.graphics.image:drawIgnoringOffset": {
      p: "pd_point",
    },
    "playdate.graphics.image:sample": {
      __return: "pd_color",
    },
    "playdate.graphics.image:drawWithTransform": {
      xform: "pd_affineTransform",
    },
    "playdate.graphics.image:transformedImage": {
      xform: "pd_affineTransform",
    },
    "playdate.graphics.image:drawSampled": {
      centerx: "number",
      centery: "number",
      dxx: "number",
      dyx: "number",
      dxy: "number",
      dyy: "number",
      z: "number",
      tile: "boolean",
    },
    "playdate.graphics.image:setMaskImage": {
      maskImage: "pd_image",
    },
    "playdate.graphics.image:clearMask": {
      opaque: "boolean",
    },
    "playdate.graphics.image:drawBlurred": {
      numPasses: "number",
      xPhase: "number",
      yPhase: "number",
    },
    "playdate.graphics.image:invertedImage": {
      __return: "pd_image",
    },
    "playdate.graphics.image:blendWithImage": {
      __return: "pd_image",
    },
    "playdate.graphics.image:blurredImage": {
      numPasses: "number",
      padEdges: "boolean",
      xPhase: "number",
      yPhase: "number",
      __return: "pd_image",
    },
    "playdate.graphics.image:fadedImage": {
      __return: "pd_image",
    },
    "playdate.graphics.image:vcrPauseFilterImage": {
      __return: "pd_image",
    },
    "playdate.graphics.nineSlice.new": {
      imagePath: "string",
    },
  };
