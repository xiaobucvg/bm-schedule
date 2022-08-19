package site.xiaobu.bmschedule;

import cn.hutool.core.util.RuntimeUtil;
import org.junit.jupiter.api.Test;

import java.nio.charset.Charset;

public class CommonTests {
    @Test
    public void test() {
        System.out.println(RuntimeUtil.execForStr(Charset.defaultCharset(), "git --version"));
    }
}
