// Copyright (C) 2020 Mike Pennisi authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-comments
description: Start of conflict comment (not enough characters)
info: |
    MultiLineComment::
      /* MultiLineCommentCharsopt *\/
      <<<<<<< MultLineCommentCharsopt =======

    SingleLineComment::
      // SingleLineCommentCharsopt
      >>>>>>> SingleLineCommentCharsopt
negative:
  phase: parse
  type: SyntaxError
---*/

$DONOTEVALUATE();

<<<<<<
=======
