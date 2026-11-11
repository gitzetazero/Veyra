// SPDX-License-Identifier: GPL-3.0-only

package main

import (
	"bytes"
	"testing"
)

func TestRun(t *testing.T) {
	var out bytes.Buffer
	if code := run([]string{"version"}, &out); code != 0 || out.String() != "veyra-release 0.0.0\n" {
		t.Fatalf("version: code=%d out=%q", code, out.String())
	}
	out.Reset()
	if code := run(nil, &out); code != 2 {
		t.Fatalf("no args: code=%d, want 2", code)
	}
}
